import React, { useState, useMemo } from 'react';
import { useGeoClock } from './useGeoClock';
import timezones from '../data/timezones.json';
import { FaClock, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import './GeoClock.css';

const TimeDisplay = ({ time, tzName, showDate, compact }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const timeOptions = useMemo(() => ({
    timeZone: tzName,
    hour: '2-digit',
    minute: '2-digit',
    ...(!compact && { second: '2-digit' }),
    hour12: true,
  }), [tzName, compact]);

  const dateOptions = useMemo(() => ({
    timeZone: tzName,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }), [tzName]);

  const timeString = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', timeOptions).format(time);
    } catch {
      return '...';
    }
  }, [time, timeOptions]);

  const dateString = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', dateOptions).format(time);
    } catch {
      return '';
    }
  }, [time, dateOptions]);

  const animation = prefersReducedMotion ? {} : {
    initial: { opacity: 0.8, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.8, y: 5 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  };

  return (
    <div className="time-display" role="timer" aria-live="polite" aria-label={`Current time: ${timeString}`}>
      <AnimatePresence mode="popLayout">
        <motion.span key={timeString} {...animation}>
          {timeString}
        </motion.span>
      </AnimatePresence>
      {showDate && !compact && <div className="date-display">{dateString}</div>}
    </div>
  );
};

const TimezoneSelector = ({ currentTz, setTzName, closeSelector }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTimezones = useMemo(() => {
    if (!searchTerm) return timezones;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return timezones
      .map(group => ({
        ...group,
        zones: group.zones.filter(zone =>
          zone.label.toLowerCase().includes(lowerCaseSearch) ||
          zone.name.toLowerCase().includes(lowerCaseSearch)
        ),
      }))
      .filter(group => group.zones.length > 0);
  }, [searchTerm]);

  return (
    <div className="timezone-selector-overlay" onClick={closeSelector}>
      <div className="timezone-selector-modal" onClick={e => e.stopPropagation()}>
        <h5 className="fw-bold mb-3">Select a Timezone</h5>
        <input
          type="search"
          className="form-control mb-3"
          placeholder="Search timezone (e.g. Lagos, London...)"
          onChange={e => setSearchTerm(e.target.value)}
          autoFocus
        />
        <div className="timezone-list">
          <button className="list-group-item list-group-item-action" onClick={() => setTzName(Intl.DateTimeFormat().resolvedOptions().timeZone)}>
            Use Device Timezone
          </button>
          {filteredTimezones.map(group => (
            <React.Fragment key={group.group}>
              <div className="timezone-group-header">{group.group}</div>
              {group.zones.map(zone => (
                <button
                  key={zone.name}
                  className={`list-group-item list-group-item-action ${currentTz === zone.name ? 'active' : ''}`}
                  onClick={() => setTzName(zone.name)}
                >
                  {zone.label}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const GeoClock = ({ showDate = true, compact = false, defaultZone = "Africa/Lagos" }) => {
  const { time, tzName, loading, error, timezoneSource, setTzName } = useGeoClock({ defaultZone });
  const [isSelectorOpen, setSelectorOpen] = useState(false);

  const tzLabel = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: tzName, timeZoneName: 'short' }).formatToParts(time);
      return parts.find(part => part.type === 'timeZoneName')?.value || '';
    } catch {
      return '';
    }
  }, [time, tzName]);

  const friendlyTzName = tzName.split('/').pop().replace(/_/g, ' ');

  return (
    <div className={`geoclock-wrapper ${compact ? 'compact' : ''}`}>
      <div className="d-flex align-items-center">
        <div className="clock-icon me-2">
          {timezoneSource === 'geo' ? <FaMapMarkerAlt /> : <FaClock />}
        </div>
        {loading ? (
          <div className="time-display">Loading...</div>
        ) : (
          <div className="time-container">
            <TimeDisplay time={time} tzName={tzName} showDate={showDate} compact={compact} />
            <div className="timezone-info">
              <span className="tz-abbreviation">{tzLabel}</span>
              {!compact && <span className="tz-name ms-2">{friendlyTzName}</span>}
            </div>
          </div>
        )}
      </div>
      <div className="clock-controls">
        {error && <div className="clock-error" title={error}>{error}</div>}
        <button className="btn btn-link btn-sm change-tz-btn" onClick={() => setSelectorOpen(true)}>
          <FaGlobe className="me-1" /> Change
        </button>
      </div>
      <AnimatePresence>
        {isSelectorOpen && (
          <TimezoneSelector
            currentTz={tzName}
            setTzName={(newTz) => {
              setTzName(newTz);
              setSelectorOpen(false);
            }}
            closeSelector={() => setSelectorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeoClock;
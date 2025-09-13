import { useState, useEffect, useCallback, useMemo } from 'react';

export const useGeoClock = ({ defaultZone = 'Africa/Lagos' } = {}) => {
  const getInitialTz = () => localStorage.getItem('selectedTimezone') || defaultZone;
  const getInitialSource = () => (localStorage.getItem('timezoneSource') || 'default');

  const [time, setTime] = useState(new Date());
  const [tzName, setTzNameState] = useState(getInitialTz);
  const [timezoneSource, setTimezoneSource] = useState(getInitialSource);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const source = localStorage.getItem('timezoneSource');
    if (source === 'manual' || source === 'geo') {
      setLoading(false);
      return;
    }

    const fetchTimezone = async () => {
      if (!('geolocation' in navigator)) {
        setError("Geolocation is not supported. Using device time.");
        const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTzNameState(deviceTz);
        setTimezoneSource('device');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const { default: geoTz } = await import('geo-tz');
            const timezones = geoTz(latitude, longitude);

            if (timezones && timezones.length > 0) {
              const newTz = timezones[0];
              setTzNameState(newTz);
              setTimezoneSource('geo');
              localStorage.setItem('selectedTimezone', newTz);
              localStorage.setItem('timezoneSource', 'geo');
            } else {
              throw new Error("Couldn't map location to a timezone.");
            }
          } catch (e) {
            setError(e.message + " Using device time.");
            const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setTzNameState(deviceTz);
            setTimezoneSource('device');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location access blocked. Using device time.");
          const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setTzNameState(deviceTz);
          setTimezoneSource('device');
          setLoading(false);
        }
      );
    };

    fetchTimezone();
  }, []);

  const setTzName = useCallback((newTz) => {
    setTzNameState(newTz);
    setTimezoneSource('manual');
    localStorage.setItem('selectedTimezone', newTz);
    localStorage.setItem('timezoneSource', 'manual');
    setError(null);
  }, []);

  const tzOffsetMinutes = useMemo(() => {
    try {
      const dateInTz = new Date(time.toLocaleString('en-US', { timeZone: tzName }));
      const localDate = new Date(time.toLocaleString('en-US'));
      return (localDate.getTime() - dateInTz.getTime()) / 60000;
    } catch {
      return 0;
    }
  }, [time, tzName]);

  return { time, tzName, tzOffsetMinutes, loading, error, timezoneSource, setTzName };
};
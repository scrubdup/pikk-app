/** PIKKUP Phase 1 client preflight. Server validation is still required before launch. */
export const PIKKUP_MAX_SECONDS = 20 * 60;
export const PIKKUP_MAX_LOCAL_BYTES = 250 * 1024 * 1024;

export function validatePikkVideoMetadata({ duration, size, type }) {
  if (!type?.startsWith('video/')) return 'Select a supported video file.';
  if (!Number.isFinite(size) || size <= 0 || size > PIKKUP_MAX_LOCAL_BYTES) return 'Video must be under 250 MB for this device-local preview.';
  if (!Number.isFinite(duration) || duration <= 0) return 'Unable to read video duration. Try another file.';
  if (duration > PIKKUP_MAX_SECONDS) return 'PIKKUP Phase 1 videos must be 20 minutes or shorter.';
  return '';
}

export function readVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    let finished = false;
    const timeout = setTimeout(() => done(new Error('Video metadata timed out')), 12000);
    function done(error, seconds) {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      video.removeAttribute('src');
      video.load();
      URL.revokeObjectURL(url);
      if (error) reject(error);
      else resolve(seconds);
    }
    video.preload = 'metadata';
    video.onloadedmetadata = () => done(null, video.duration);
    video.onerror = () => done(new Error('Cannot read this video file'));
    video.src = url;
  });
}

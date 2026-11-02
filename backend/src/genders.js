// SINGLE SOURCE OF TRUTH for account gender values (backend validation, 0013 CHECK constraint, frontend selects).
export const GENDERS = Object.freeze(['female', 'male', 'nonbinary', 'undisclosed']);
export const GENDER_LABELS = Object.freeze({ female: 'Female', male: 'Male', nonbinary: 'Non-binary', undisclosed: 'Prefer not to say' });
export const genderOptionsHtml = () => '<option value="">Choose…</option>' + GENDERS.map((g) => `<option value="${g}">${GENDER_LABELS[g]}</option>`).join('');

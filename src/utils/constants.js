export const PRIMARY_DARK = '#384B56';
export const ACCENT_COLOR = '#308FFF';
export const BACKGROUND_COLOR = '#FFFFFF';
export const FORM_COLOR = '#EEEEEE';

export const PRIMARY_LIGHT = '#eaeef3';
export const PREVIEW_TEXT_COLOR = '#bdbdbd';
export const INPUT_TEXT_COLOR = '#8f9494';
export const PREVIEW_IMAGE_COLOR = '#e4e4e4';
export const CANCEL_COLOR = '#f86a6a';

export const pillTypes = [
  { label: 'Капсула', value: 'capsule', key: 'key-capsule' },
  { label: 'Таблетка', value: 'pill', key: 'key-pill' },
  { label: 'Суспенсия', value: 'suspension', key: 'key-suspension' },
  { label: 'Ампула', value: 'ampule ', key: 'key-ampule' },
  { label: 'Крем/мазь', value: 'cream ', key: 'key-cream' },
  { label: 'Другое', value: 'other ', key: 'key-pill-other' },
];

export const pillQuantityTypes = [
  { label: 'шт', value: 'pill', key: 'key-type-pill' },
  { label: 'мл', value: 'ml', key: 'key-type-ml' },
  { label: 'грамм', value: 'g', key: 'key-type-g' },
  { label: 'мг', value: 'mg', key: 'key-type-mg' },
  { label: 'ст.ложка', value: 'tablespoon ', key: 'key-type-tablespoon' },
  { label: 'ч.ложка', value: 'teaspoon ', key: 'key-type-teaspoon' },
  { label: 'бутылка', value: 'bottle ', key: 'key-type-bottle' },
  { label: 'доза', value: 'dose ', key: 'key-type-dose' },
  { label: 'капли', value: 'drop ', key: 'key-type-drop' },
  { label: 'другое', value: 'other ', key: 'key-type-other' },
];

export const days = [
  { value: 'monday', label: 'пн' },
  { value: 'tuesday', label: 'вт' },
  { value: 'wednesday', label: 'ср' },
  { value: 'thursday', label: 'чт' },
  { value: 'friday', label: 'пт' },
  { value: 'saturday', label: 'сб' },
  { value: 'sunday', label: 'вс' },
];

export const frequency = [
  { value: 'days', label: 'день' },
  { value: 'weekly', label: 'неделя' },
  { value: 'monthly', label: 'месяц' },
  { value: 'yearly', label: 'год' },
];

export const durationIntervalTypes = [
  { label: 'неделя', value: 'week ', key: 'key-type-week' },
  { label: 'месяц', value: 'month ', key: 'key-type-month' },
  { label: 'год', value: 'year ', key: 'key-type-year' },
];

export const pillsQuantity = [...Array(10).keys()].map((i) => ({
  value: String(i),
  label: String(i),
  key: `key-${i}`,
}));

export const dosagePeriodDuration = [
  { label: 'день(-ня)', value: 'day(s) ', key: 'duration_days' },
  { label: 'неделя(и)', value: 'week(s) ', key: 'duration_weeks' },
  { label: 'месяц(ев)', value: 'month(s) ', key: 'duration_months' },
  { label: 'год(а)', value: 'year(s) ', key: 'duration_years' },
];

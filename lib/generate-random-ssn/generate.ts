import { faker } from '@faker-js/faker';

export type GeneratedFakeSsn = {
  area: string;
  group: string;
  serial: string;
  ssn: string;
};

export type SsnValidationResult = {
  isValid: boolean;
  hasValidLength: boolean;
  hasValidArea: boolean;
  hasValidGroup: boolean;
  hasValidSerial: boolean;
};

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function isValidArea(area: string): boolean {
  if (area.length !== 3) {
    return false;
  }

  const value = Number.parseInt(area, 10);

  if (Number.isNaN(value)) {
    return false;
  }

  if (value === 0 || value === 666) {
    return false;
  }

  return value >= 1 && value <= 899;
}

function isValidGroup(group: string): boolean {
  if (group.length !== 2) {
    return false;
  }

  const value = Number.parseInt(group, 10);

  if (Number.isNaN(value)) {
    return false;
  }

  return value >= 1 && value <= 99;
}

function isValidSerial(serial: string): boolean {
  if (serial.length !== 4) {
    return false;
  }

  const value = Number.parseInt(serial, 10);

  if (Number.isNaN(value)) {
    return false;
  }

  return value >= 1 && value <= 9999;
}

function randomArea(): string {
  while (true) {
    const area = faker.number.int({ min: 1, max: 899 });

    if (area === 666) {
      continue;
    }

    return String(area).padStart(3, '0');
  }
}

function randomGroup(): string {
  return String(faker.number.int({ min: 1, max: 99 })).padStart(2, '0');
}

function randomSerial(): string {
  return String(faker.number.int({ min: 1, max: 9999 })).padStart(4, '0');
}

export function validateFakeSsn(value: string): SsnValidationResult {
  const normalized = digitsOnly(value);
  const hasValidLength = normalized.length === 9;

  if (!hasValidLength) {
    return {
      isValid: false,
      hasValidLength,
      hasValidArea: false,
      hasValidGroup: false,
      hasValidSerial: false,
    };
  }

  const area = normalized.slice(0, 3);
  const group = normalized.slice(3, 5);
  const serial = normalized.slice(5, 9);

  const hasValidArea = isValidArea(area);
  const hasValidGroup = isValidGroup(group);
  const hasValidSerial = isValidSerial(serial);

  return {
    isValid: hasValidArea && hasValidGroup && hasValidSerial,
    hasValidLength,
    hasValidArea,
    hasValidGroup,
    hasValidSerial,
  };
}

export function generateFakeSsn(): GeneratedFakeSsn {
  const area = randomArea();
  const group = randomGroup();
  const serial = randomSerial();
  const ssn = `${area}-${group}-${serial}`;

  const validation = validateFakeSsn(ssn);

  if (!validation.isValid) {
    throw new Error('Generated SSN failed validation checks');
  }

  return {
    area,
    group,
    serial,
    ssn,
  };
}

export function generateFakeSsns(count: number): GeneratedFakeSsn[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generateFakeSsn());
}

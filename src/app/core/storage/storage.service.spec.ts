import using from 'jasmine-data-provider';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
  });

  it('should store any JSON friendly value to localStorage', () => {
    using([
      { key: 'foo', value: 'bar' },
      { key: 'foo', value: true },
      { key: 'foo', value: 1 },
      { key: 'foo', value: { bar: true }},
      { key: 'foo', value: false },
      { key: 'foo', value: [] },
    ], ({ key, value }) => {
      service.store(key, value);
      const expected = JSON.stringify(value);

      expect(localStorage.getItem(key)).toEqual(expected);
    });
  });

  it('should receive any JSON friendly value from localStorage', () => {
    using([
      { key: 'foo', value: JSON.stringify('bar') },
      { key: 'foo', value: JSON.stringify(true) },
      { key: 'foo', value: JSON.stringify(1) },
      { key: 'foo', value: JSON.stringify({ bar: true }) },
    ], ({ key, value }) => {
      localStorage.setItem(key, value);
      const received = service.receive(key);

      expect(received).toEqual(JSON.parse(localStorage.getItem(key)));
    });
  });
});

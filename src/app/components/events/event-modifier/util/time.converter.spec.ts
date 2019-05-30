import { convertToInputString } from '../util/time.converter';

describe('Time converter', () => {

    it('should convert date for suitable for input string', () => {
        expect(convertToInputString(new Date(2018, 9, 10, 9, 10))).toBe('2018-10-10T09:10');
    });

});

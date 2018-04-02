import normalizePalette from '../normalizePalette';

describe('normalizePalette', () => {
  it('should fill empty spaces with white', () => {
    const input = {
      length: 4,
      palette: ['#bbb']
    };
    const test = ['#bbb', '#fff', '#fff', '#fff'];
    expect(normalizePalette(input)).toEqual(test);
  });
});

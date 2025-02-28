import React from 'react';
import './ColorPalette.scss';

const colors = [
  { name: 'Default', value: '#FFFFFF' },
  { name: 'Coral', value: '#FAAFA8' },
  { name: 'Peach', value: '#F39F76' },
  { name: 'Sand', value: '#FFF8B8' },
  { name: 'Mint', value: '#E2F6D3' },
  { name: 'Sage', value: '#B4DDD3' },
  { name: 'Fog', value: '#D4E4ED' },
  { name: 'Storm', value: '#AECCDC' },
  { name: 'Dusk', value: '#D3BFDB' },
  { name: 'Blossom', value: '#F6E2DD' },
  { name: 'Clay', value: '#E9E3D4' },
  { name: 'Chalk', value: '#EFEFF1' },
];

const ColorPalette = ({ onColorSelect, noteId }) => {
  return (
    <div className="color-palate-cnt">
      {colors.map((color) => (
        <div
          key={color.value}
          className={`color-btn col-${color.name.toLowerCase()}`}
          title={color.name}
          style={{ backgroundColor: color.value }}
          onClick={() => onColorSelect({ noteId, color: color.value })}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
// Add medicine
const handleSelect = (med, selected, setSelected) => {
  const exists = selected.some((item) => item.name === med);
  if (!exists) {
    setSelected([...selected, { name: med, quantity: 1 }]);
  }
};

// Update quantity
const handleQuantity = (name, value, setSelected) => {
  setSelected((prev) =>
    prev.map((item) => (item.name === name ? { ...item, quantity: Number(value) } : item))
  );
};

const handleRemove = (name, selected, setSelected) => {
  setSelected(selected.filter((item) => item.name !== name));
};
export { handleSelect, handleQuantity, handleRemove };

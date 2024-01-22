export const getCheckedInputs = (
  elements: HTMLInputElement[],
  name: string,
) => {
  return elements.filter((el) => el.name === name && el.checked)
}

export const getCheckedInputsValues = (
  elements: HTMLInputElement[],
  name: string,
) => {
  return getCheckedInputs(elements, name).map((el) => el.value)
}

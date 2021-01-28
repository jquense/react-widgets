const { stripIndent } = require('common-tags')

module.exports = function () {
  return stripIndent`
    let { Combobox, DropdownList, DateTimePicker,
      Calendar, SelectList, Multiselect } = ReactWidgets;

    let data = listOfPeople();

    <>
      <DropdownList
        data={data}
        textField="firstName"
        defaultValue={data[0]}
      />
      <br />
      <Combobox
        data={data}
        textField="firstName"
        defaultValue={data[1]}
      />
      <br />
      <Multiselect
        data={data}
        textField="firstName"
        defaultValue={data.slice(0, 2)}
      />
      <br />
      <SelectList
        multiple
        data={data}
        textField="firstName"
        defaultValue={data[4]}
      />
      <br />
      <DateTimePicker format="MMM dd yyyy h:mm tt" />
      <br />
      <Calendar defaultView="year" />
    </>
  `
}

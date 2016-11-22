import {
  Combobox, DropdownList, DateTimePicker,
  Calendar, SelectList, Multiselect, NumberPicker } from 'react-widgets';
import genData from '../generate-data';

var list = genData(50);

export default Showcase() {
  return (
    <div className="showcase">
      <div className='showcase-row'>
        <DropdownList
          data={data}
          textField="firstName"
          defaultValue={data[0]}
        />
        <Combobox
          data={data}
          textField="firstName"
          defaultValue={data[1]}
        />
        <Multiselect
          data={data}
          textField="firstName"
          defaultValue={data.slice(0, 2)}
        />
      </div>
      <div className='showcase-row'>
        <NumberPicker />
        <DateTimePicker />
      </div>
      <div className='showcase-row'>
        <SelectList
          multiple
          data={data}
          textField="firstName"
          defaultValue={data[4]}
        />
        <Calendar />
      </div>
    </div>
  )
}

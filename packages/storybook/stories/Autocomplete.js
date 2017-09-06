import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './Container';
import Autocomplete from 'react-widgets/lib/Autocomplete';

let generateNames = global.generateNames;

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName',
  placeholder: 'type something…',
}

class PlacesAutoComplete extends React.Component {
  state = { data: [], value: '' };
  autocompleteService = new window.google.maps.places.AutocompleteService();

  handleChange = (value) => {
    this.setState({ value })

    if (!value || value.placeId) return;

    this.setState({ busy: true })

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.autocompleteService
        .getPlacePredictions({ input: value.text || value }, (predictions) => {
          this.setState({ busy: false })
          if (!predictions) return;

          this.setState({
            data: predictions.map(p => ({
              text: p.description,
              placeId: p.place_id,
              ...p.structured_formatting,
            }))
          })
        });
    }, 500)
  }

  render() {
    return (
      <Autocomplete
        value={this.state.value}
        onChange={this.handleChange}
        data={this.state.data}
        textField="text"
        valueField="placeId"
        busy={this.state.busy}
        placeholder="type to find places…"
      />
    )
  }
}


storiesOf('Autocomplete', module)
  .add('Autocomplete', () =>
    <Container>
      <PlacesAutoComplete
        {...props}
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <Autocomplete
        {...props}
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <Autocomplete
        {...props}
        disabled
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('disabled items', () =>
    <Container>
      <Autocomplete
        {...props}
        open
        disabled={[props.data[2]]}
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('disabled item, first focused', () =>
    <Container>
      <Autocomplete
        {...props}
        open
        disabled={props.data.slice(0, 2)}
      />
    </Container>
  )
  .add('readOnly', () =>
    <Container>
      <Autocomplete
        {...props}
        readOnly
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <Autocomplete
        {...props}
        isRtl
        defaultValue={props.data[1]}
      />
    </Container>
  )

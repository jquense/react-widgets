import partial from 'lodash/partial'
import React from 'react'
import Layout from './Layout'

class Demo extends React.Component {
  render() {
    const { children, shortcuts } = this.props
    const { show } = this.state || {}
    let toggle = () => this.setState({ show: !show })

    return (
      <section className="flex flex-col" role="application">
        <div className="flex flex-col md:flex-row md:items-center text-sm">
          {children}
        </div>
        {shortcuts && (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={toggle}
              className="font-brand text-xl px-4 mb-4 self-center text-purple focus:outline-none focus:shadow-outline"
            >
              <i className="fa fa-keyboard-o" aria-hidden="true" />
              Keyboard shortcuts
            </button>
            <div hidden={!show}>
              <div>
                <ul>
                  {shortcuts.map(({ key, label }) => (
                    <li key={key}>
                      <kbd>{key}</kbd> {label}{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }
}

Demo.Stage = ({ children }) => (
  <div
    className="mt-4 mb-6 mx-auto px-4"
    css={css`
      min-width: 400px;

      @screen md {
        min-width: 300px;
      }
    `}
  >
    {children}
  </div>
)

Demo.Controls = props => (
  <Layout
    {...props}
    direction="column"
    className="px-4 py-3 mt-3 border-t border-divider -lg md:p-4 md:border-t-0 md:border-l"
    css={css`
      @screen md {
        flex: 0 0 40%;
      }
    `}
  />
)

Demo.Control = props => (
  <Layout {...props} pad={false} justify="flex-end" direction="column">
    {props.label && <label className="control-label">{props.label}</label>}
    {props.children}
  </Layout>
)

export function createSetter(instance) {
  let setter = (field, value) => {
    instance.setState({ [field]: value })
  }

  return partial(partial, setter)
}

export default Demo

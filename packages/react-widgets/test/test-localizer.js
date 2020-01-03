import { DateLocalizer, NumberLocalizer } from '../src/IntlLocalizer'

global.TEST_LOCALIZERS = {
  date: new DateLocalizer(),
  number: new NumberLocalizer(),
}

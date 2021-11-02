import { configure } from 'enzyme'
import { toHaveNoViolations } from 'jest-axe'
import Adapter from 'enzyme-adapter-react-16'
import '@testing-library/jest-dom'

configure({ adapter: new Adapter() })

expect.extend(toHaveNoViolations)

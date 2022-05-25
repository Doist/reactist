import { configure } from 'enzyme'
import { toHaveNoViolations } from 'jest-axe'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom'

configure({ adapter: new Adapter() })

expect.extend(toHaveNoViolations)

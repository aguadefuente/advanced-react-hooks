import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

// 🦺 make a type called "State" which is an object with a count property as a number
// 🦺 make a type called "Action" which is the same as the State type
type State = { count: number }
type Action = State
// 🐨 update this function to accept "state" (type "State") and an
// "action" (type "Action")
// 🐨 the function should merge properties from the state and the action and
// return that new object
//const countReducer = (count: number, change: number) => count + change
const countReducer = (state: State, action: Action) => ({ ...state, ...action })

function Counter({ initialCount = 0, step = 1 }) {
	// 🐨 change this to "state" and "setState" and update the second argument
	// to be an object with a count property.
	//const [count, changeCount] = useReducer(countReducer, initialCount)
	const [state, setState] = useReducer(countReducer, {
		count: initialCount,
	})
	// 🐨 update these calls to call setState with an object and a count property
	//const increment = () => changeCount(step)
	//const decrement = () => changeCount(-step)
	const { count } = state
	const increment = () => setState({ count: count + step })
	const decrement = () => setState({ count: count - step })
	return (
		<div className="counter">
			<output>{count}</output>
			<div>
				<button onClick={decrement}>⬅️</button>
				<button onClick={increment}>➡️</button>
			</div>
		</div>
	)
}

function App() {
	const [initialCount, setInitialCount] = useState(0)
	const [step, setStep] = useState(1)

	return (
		<div className="app">
			<h1>Counter:</h1>
			<form>
				<div>
					<label htmlFor="initial-count-input">Initial Count</label>
					<input
						id="initial-count-input"
						type="number"
						value={initialCount}
						// 🦉 notice when you change the initial count, it doesn't affect
						// the counter because it's literally the "initial" count.
						onChange={e => setInitialCount(Number(e.currentTarget.value))}
					/>
				</div>
				<div>
					<label htmlFor="step-input">Step</label>
					<input
						id="step-input"
						type="number"
						value={step}
						onChange={e => setStep(Number(e.currentTarget.value))}
					/>
				</div>
			</form>
			<Counter initialCount={initialCount} step={step} />
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)

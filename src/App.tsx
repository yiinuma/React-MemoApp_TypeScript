import { Toaster } from 'react-hot-toast'

import './style.css'
import { Todo } from './Todo'

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Todo />
    </>
  )
}

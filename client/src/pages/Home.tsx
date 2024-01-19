import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <ul>
  <h1>hello there how are you</h1>
<li>
        <Link to="/users">users</Link>

</li>
<li>

        <Link to="/add-user">add users</Link>
</li>
    </ul>
  )
}

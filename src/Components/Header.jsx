import image from '../assets/chef.png'

export default function Header () {
    return (
        <header>
            <img src = {image} alt = "chef" />
            <h1>Chef Henry</h1>
        </header>
    )
}
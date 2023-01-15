export const Menu: React.FC=()=>{
    return(
        <aside className="column is-2 is-narrow-mobile s-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch"/>
                <ul className="menu-list">
                    <li>
                        <a href="#">
                            <span className="icon"></span> Home
                        </a>
                    </li>
                </ul>
            
        </aside>
    )
}
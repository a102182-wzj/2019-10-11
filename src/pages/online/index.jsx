import router from 'umi/router'

const OnlineChoose = (props) => {
    console.log("choose props", props)
    const sub_menu = props.location.query.menu
    console.log("sub_menu", sub_menu)
    if (sub_menu !== undefined && sub_menu.length > 0) {
        router.push(sub_menu[0].url)
    }
    return (
        <div>123</div>
    )
}

export default OnlineChoose
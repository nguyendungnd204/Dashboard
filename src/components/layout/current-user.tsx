import { Popover, Button } from "antd"
import CustomAvater from "../custom-avater"

const CurrentUser = () => {
    return (
        <>
            <Popover
            placement="bottomRight"
            trigger="click"
            overlayInnerStyle={{padding: 0}}
            overlayStyle={{zIndex: 999}}
            >
                <CustomAvater/>
            </Popover>
        </>
    )
}

export default CurrentUser
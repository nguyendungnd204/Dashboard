import { Popover, Button } from "antd"
import CustomAvater from "../custom-avater"
import { useGetIdentity } from "@refinedev/core"
import type {User} from '@/graphql/schema.types'

const CurrentUser = () => {
    const {data: user} = useGetIdentity<User>()
    return (
        <>
            <Popover
            placement="bottomRight"
            trigger="click"
            >
                <CustomAvater/>
            </Popover>
        </>
    )
}

export default CurrentUser
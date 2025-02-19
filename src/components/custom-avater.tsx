import {Avatar as AntdAvatar, AvatarProps} from 'antd';

type Props = AvatarProps & {
    name: string;
}
const CustomAvater = ({name, style, ...rest}: Props) => {
  return (
    <AntdAvatar
    alt={'JavaScript Dung'}
    size={"small"}
    style={{backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none'
    }}
    >
        {name}
    </AntdAvatar>
  )
}

export default CustomAvater
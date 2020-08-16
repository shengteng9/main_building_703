import { 
	Row,
	Col,
	Menu, 
	Dropdown 
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Link from "next/link";
const menu = (
  <Menu>
    <Menu.Item>
			<Link href="/pmp">
				<a target="_blank" rel="noopener noreferrer">
					PMP习题库
				</a>
			</Link>
    </Menu.Item>
  </Menu>
);
const Header = props => {
	return (
		<header className="header_wrap">
			<div className="nav_item">
				<span className="site_name">主楼703</span>
			</div>
			<div className="nav_item_tools">
				<Dropdown overlay={menu} placement="bottomRight">
					<div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
						小工具 <DownOutlined />
					</div>
				</Dropdown>
			</div>
		</header>
	)
}

export default Header;
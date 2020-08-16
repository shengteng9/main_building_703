
import Link from "next/link";

const Footer = props => {
	return (
		<footer className="footer_wrap">
			<nav>
				<Link href="/">
					<a>首页</a>
				</Link>
			</nav>
			<nav>
				© Copyright by zhulou703.top. All rights reserved.
			</nav>
		</footer>
	)
}

export default Footer;
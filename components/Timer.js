import {
	Button,
} from 'antd'
import "../style/timer.less"

const Timer = () => {
	return (
		<div className="wrap">
			<div className="container">
				<Button size="small" type="primary"> 开始答题 </Button>
				<span className="time">计时器：
					<Badge color="warning">
						<span>00 : 00</span>
					</Badge>
				</span>
			</div>
			<style jsx>{`
				.timer_wrap{
					position:fixed;
					width:100%;
					margin-bottom:1rem;
					background:#fff;
					height:60px;
					line-height:60px;
					z-index:1000;
					top:0;
					border-bottom:1px solid #eee;
				}
				.timer_wrap .time{
					margin-left:1rem;
				}
			`}</style>

		</div>
	)
}

export default Timer
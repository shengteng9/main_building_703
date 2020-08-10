import Link from "next/link";
import "../style/pmp.less";
const Index = () => {
  return (
    <div className="wrap">
      <div className="container">
        <Link href="/pmp"><a>PMP习题库</a></Link>
      </div>
    </div>
  )
}

export default Index
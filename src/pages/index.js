import styles from './index.css';
import { is_mobile } from '../utils/common'

export default function () {
  // console.log("是否移动端", is_mobile())
  window.location.href='/login'
  // return (
  //   <div className={styles.normal}>
  //     <div className={styles.welcome} />
  //     <ul className={styles.list}>
  //       <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
  //       <li>
  //         <a href="https://umijs.org/guide/getting-started.html">
  //           Getting Started
  //         </a>
  //       </li>
  //     </ul>
  //   </div>
  // );
}

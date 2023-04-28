import { useEffect } from "react";
import FormFour from "./forms/form-four";
import FormOne from "./forms/form-one";
import FormThree from "./forms/form-three";
import FormTwo from "./forms/form-two";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import FormFive from "./forms/form-five";
import RecieptPieChart from "../components/pie-chart";
import RecieptRadialBarChart from "../components/radial-bar-chart";
import RecieptAreaChart from "../components/area-chart";
import { InitialState } from "../store";

export enum Sections {
  AppDevelopmentNeeds = "App Development Needs",
  AppStorePlatforms = "App Store Platforms",
  ServicesRequired = "Services Required",
  WebDevelopmentNeeds = "Web Development Needs",
  UxDesignNeeds = "UX Design Needs"
}

export function Index() {
  // , stepIndex, total
  const { selectedOptions, stepIndex, total } = useSelector((state: InitialState) => state);
  //const total = 49000;
  const hours = 976;
  //const stepIndex = 5;

  function calculatePercentage(total: number, percentage: number): number {
    const percentageDecimal = percentage / 100;
    return total * percentageDecimal;
  }

  function formatCurrency(total: number): string {
    return total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
  }

  function getTotalPartPrice(percentage: number) {
    const depositTotal = calculatePercentage(total, percentage);
    return formatCurrency(depositTotal);
  }

  function hoursToWords(hours: number): string {
    const monthWord = hours >= 720 ? 'month' : '';
    const weekWord = hours >= 168 ? 'week' : '';
    const dayWord = hours >= 24 ? 'day' : '';
  
    if (!monthWord && !weekWord && !dayWord) {
      return `${hours} hours`;
    }
  
    const wholeMonths = Math.floor(hours / 720);
    const wholeWeeks = Math.floor((hours % 720) / 168);
    const wholeDays = Math.floor((hours % 168) / 24);
  
    const monthString = wholeMonths > 0 ? `${wholeMonths} ${monthWord}${wholeMonths > 1 ? 's' : ''}${(wholeWeeks > 0 || wholeDays > 0) && (wholeMonths > 0 && (wholeWeeks > 0 || wholeDays > 0)) ? ', ' : ''}` : '';
    const weekString = wholeWeeks > 0 ? `${wholeWeeks} ${weekWord}${wholeWeeks > 1 ? 's' : ''}${wholeDays > 0 && wholeMonths === 0 ? ' and ' : (wholeDays > 0 ? ', ' : '')}` : '';
    const dayString = wholeDays > 0 ? `${wholeDays} ${dayWord}${wholeDays > 1 ? 's' : ''}` : '';
  
    const timeString = `${monthString}${weekString}${dayString}`;
    return timeString;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className="banner">
          <h1 className="banner__title">
            {stepIndex !== 5 && <span>Request a Web Design Quote from Our Agency</span>}
            {stepIndex === 5 && <span>Your Estimated Quote</span>}
          </h1>
        </div>

        {stepIndex === 0 &&
          <FormOne/>
        }
        {stepIndex === 1 &&
          <FormTwo/>
        }
        {stepIndex === 2 &&
          <FormThree/>
        }
        {stepIndex === 3 &&
          <FormFour/>
        }
        {stepIndex === 4 &&
          <FormFive/>
        }

        {stepIndex === 5 && <div>
          <p>We have estimated it will take roughly <strong>{hoursToWords(hours)}</strong> to complete your project.</p>
          <p>Please find below a breakdown of our payment structure.</p>
          <div className={styles.grid}>
            <div className={styles['grid__item']}>
              <div className={styles['grid__item-name']}>5% Project Deposit</div>
              <div className={styles['grid__item-value']}>{getTotalPartPrice(5)}</div>
            </div>
            <div className={styles['grid__item']}>
              <div className={styles['grid__item-name']}>25% Project Start</div>
              <div className={styles['grid__item-value']}>{getTotalPartPrice(25)}</div>
            </div>
            <div className={styles['grid__item']}>
              <div className={styles['grid__item-name']}>70% Project Completed</div>
              <div className={styles['grid__item-value']}>{getTotalPartPrice(70)}</div>
            </div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Hours</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Web design</td>
                <td>40</td>
                <td>$2,000</td>
              </tr>
              <tr>
                <td>Logo design</td>
                <td>10</td>
                <td>$500</td>
              </tr>
              <tr>
                <td>Content writing</td>
                <td>20</td>
                <td>$1,000</td>
              </tr>
            </tbody>
          </table>
          <div>
            <RecieptAreaChart />
          </div>
          <div>
            <RecieptPieChart />
          </div>
          <div>
            <RecieptRadialBarChart />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Index;

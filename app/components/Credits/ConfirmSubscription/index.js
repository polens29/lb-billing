/**
 *
 * ConfirmSubscription
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Icon, Card, Spin, Row, Col,
} from 'antd';

import PaypalIcon from 'assets/paypal.png';
import BankTransferText from 'assets/bank-transfer.png';
import BankTransferLogo from 'assets/bank-transfer-logo.png';
import VisaLogo from 'assets/visa.png';
import AmexLogo from 'assets/amex.png';
import MasterCardLogo from 'assets/mastercard.png';
import { Wrapper, WrapperButton, Title, Img, InputPromoCode, FlexibleButton } from '../css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// eslint-disable-next-line react/prefer-stateless-function
class ConfirmSubscription extends React.PureComponent {

  render() {
    const {
      plan_id,
      subscribePlanLoading,
      handleSubscriptionPlan,
      handleBankTransfer,
      plans,
      handleSubscriptionCheckout,
      checkoutLoading,
      handleApplyPromoCode,
      promoCode,
      updatePromoCode,
      verifiedPromoCode,
      isPromoCodeNotValid,
      promoCodeErrorMsg,
      planAmount,
      planAmountLoading,
    } = this.props;
    const plan = plans.find((p) => p.id === plan_id);
    return (
      <Wrapper>

        <Title>
          <span style={{ color: '#444444', fontSize: '16px', fontWeight: 400 }}>Confirm your billing cycle</span>
        </Title>

        <Card
          style={{
            backgroundColor: '#F6F6F6',
            marginTop: 30,
            marginBottom: 30,
            borderRadius: 1,
            fontSize: 16,
            color: '#444444',
            fontWeight: 400,
          }}
          bodyStyle={{ paddingLeft: 50, paddingRight: 50 }}
        >
          <Row style={{ marginBottom: 30 }}>
            <Col span={12}>
              <div style={{ textAlign: 'left' }}>
                Plan
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'right' }}>
                Price
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={12}>
              <div style={{ textAlign: 'left' }}>
                {plan.interval === 'month' && 'Monthly'}
                {plan.interval === 'year' && 'Annually'}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'right' }}>
                {plan.prices.find((price) => price.currency === 'USD').amount.toLocaleString()} USD
              </div>
            </Col>
          </Row>
          {plan.extra_credits > 0 &&
            <Row style={{ marginBottom: 30 }}>
              <Col span={24}>
                <div style={{ textAlign: 'left' }}>
                  (Extra {plan.extra_credits.toLocaleString()} Credits)
              </div>
              </Col>
            </Row>
          }
          {(verifiedPromoCode != null && !isPromoCodeNotValid) &&
            <Row style={{ marginBottom: 30 }}>
              <Col span={24}>
                <div style={{ textAlign: 'left' }}>
                  {verifiedPromoCode.extra_credits > 0 && (
                    <div>
                      {verifiedPromoCode.extra_credits.toLocaleString()} Free Credits ( Promo code: {verifiedPromoCode.code} ) <br />
                    </div>
                  )
                  }
                  {verifiedPromoCode.discount.toLocaleString()} % Discount
              </div>
              </Col>
            </Row>
          }
          <Row style={{ marginBottom: 30 }}>
            <Col span={24}>
              <div style={{ textAlign: 'right', fontSize: 16 }}>
                <span style={{ marginRight: 80 }}>
                  Total
               </span>
                {planAmount.total_amount != null && planAmount.total_amount.toLocaleString()}
                {planAmount.total_amount == null && plan.prices.find((price) => price.currency === 'USD').amount.toLocaleString()} USD
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ textAlign: 'right', fontSize: 16 }}>
                (GST Included)
              </div>
            </Col>
          </Row>
        </Card>

        <div style={{ textAlign: 'center', color: '#444444', marginBottom: 30 }}>
          <div>
            <InputPromoCode
              placeholder="Apply Promo Code"
              value={promoCode}
              onChange={updatePromoCode}
              style={{
                width: '155px',
                marginRight: '10px',
              }}
            />
            {(verifiedPromoCode != null && !isPromoCodeNotValid) && (
              <span style={{ color: '#4BB543' }}>
                <Icon type="check" /> Applied
              </span>
            )
            }
            {verifiedPromoCode == null && (
              <FlexibleButton className="ant-btn ant-btn-primary"
                onClick={() => handleApplyPromoCode()} disabled={!promoCode}
                loading={planAmountLoading}>
                Apply
              </FlexibleButton>
            )
            }
          </div>
          {
            (isPromoCodeNotValid && verifiedPromoCode == null) && (
              <div style={{ color: '#de5c5c', fontSize: 12 }}>
                {promoCodeErrorMsg}
              </div>
            )
          }
        </div>
        <div style={{ textAlign: 'center', color: '#444444', fontSize: 16, fontWeight: 500, marginBottom: 30 }}>
          Select your payment method
        </div>

        <Card
          style={{
            textAlign: 'center',
            width: '80%',
            margin: '0 auto',
            backgroundColor: '#F6F6F6',
            marginBottom: 20,
            borderRadius: 1,
          }}
          bodyStyle={{ padding: 30 }}
        >
          <div>
            <WrapperButton onClick={handleSubscriptionCheckout} style={{ marginBottom: 20 }}>
              {
                checkoutLoading && <Spin indicator={antIcon} style={{ float: "left" }} />
              }
              <span style={{ padding: 5 }}>
                <Img src={VisaLogo} style={{ marginRight: 5 }} />
                <Img src={MasterCardLogo} style={{ marginRight: 5 }} />
                <Img src={AmexLogo} />
              </span>
            </WrapperButton>
            <WrapperButton onClick={handleSubscriptionPlan} style={{ marginBottom: 20 }} >
              {
                subscribePlanLoading && <Spin indicator={antIcon} style={{ float: "left" }} />
              }
              <span style={{ padding: 5 }}>
                <Img src={PaypalIcon} />
              </span>
            </WrapperButton>
            <WrapperButton onClick={() => handleBankTransfer(5)}>
              <span style={{ padding: 5 }}>
                <Img src={BankTransferLogo} style={{ marginRight: 10 }} />
                <Img src={BankTransferText} style={{ height: 12 }} />
              </span>
            </WrapperButton>
          </div>
        </Card>
      </Wrapper>
    );
  }

}

ConfirmSubscription.propTypes = {
  plan_id: PropTypes.number,
  subscribePlanLoading: PropTypes.bool,
  handleSubscriptionPlan: PropTypes.func,
  handleBankTransfer: PropTypes.func,
  plans: PropTypes.array,
  handleSubscriptionCheckout: PropTypes.func,
  checkoutLoading: PropTypes.bool,
  promoCode: PropTypes.string,
  updatePromoCode: PropTypes.func,
  handleApplyPromoCode: PropTypes.func,
  verifiedPromoCode: PropTypes.object,
  isPromoCodeNotValid: PropTypes.bool,
  promoCodeErrorMsg: PropTypes.string,
  planAmountLoading: PropTypes.bool,
  planAmount: PropTypes.object,
};

export default ConfirmSubscription;

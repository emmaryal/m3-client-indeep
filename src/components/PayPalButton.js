import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { PayPalButton } from "react-paypal-button-v2";

class PayPalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true,
    };
  }
  componentDidMount() {}

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;
    const { showButton } = this.state;
    const payment = () => {}
      /* paypal.rest.payment.create(env, client, {
        transactions: [{ amount: { total, currency } }],
      }) */ 
    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };
        onSuccess(payment);
      });
    return (
      <div>
        {showButton && (
          <PayPalButton
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />
        )}
      </div>
    );
  }
}

export default PayPalButton;

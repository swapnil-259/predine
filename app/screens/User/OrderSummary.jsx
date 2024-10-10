import {StyledText, StyledView} from '../../components';

const OrderSummary = () => {
  return (
    <StyledView>
      <StyledText
        tw={'text-black'}
        text={
          'hii, when you placed order, you will get the summary'
        }></StyledText>
    </StyledView>
  );
};

export default OrderSummary;

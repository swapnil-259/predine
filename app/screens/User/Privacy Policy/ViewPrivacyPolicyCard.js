import React from 'react';
import {StyledText, StyledView} from '../../../components';

const ViewPrivacyPolicyCard = ({modalVisible}) => {
  const renderContent = () => {
    switch (modalVisible) {
      case 'privacyPolicy':
        return (
          <StyledView tw="justify-center pt-5 px-4">
            <StyledText
              tw="text-lg font-bold mb-3 text-black text-[22px]"
              text={'Privacy Policy'}></StyledText>
            <StyledText
              tw="mb-2 text-black text-[18px]"
              text={
                'The policies implemented by Predine are crafted to ensure a seamless and secure experience for users while also addressing the unique challenges associated with pre-ordering in the culinary industry'
              }></StyledText>

            <StyledText
              tw="text-lg font-bold mb-1 text-black text-[20px]"
              text={'Time Policy:'}></StyledText>
            <StyledText
              tw="mb-2 text-black text-[16px]"
              text={
                'Predine provides flexibility to customers when selecting their preferred time slot for order pickup. Customers can choose a time slot that best suits their needs. However, certain considerations come into play:'
              }></StyledText>
            <StyledText
              tw="font-bold mb-1 text-black text-[17px]"
              text={'Minimum Time Requirement:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[14px]"
              text={
                'The minimum wait time for order preparation and pickup may vary based on the size and complexity of the order. Larger orders may have a minimum wait time ranging from 20 to 30 minutes, while smaller orders may have a minimum wait time of 5 to 10 minutes. These time frames are subject to change based on the specific food items and order volume. This time policy ensures a balance between customer convenience and operational efficiency.'
              }></StyledText>

            <StyledText
              tw="text-lg font-bold mb-1 text-black text-[20px]"
              text={'Payment Mode:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[16px]"
              text={
                'Predine accepts online payments exclusively. Customers can make secure payments through the app using various online payment methods. This policy aligns with the modern trend of digital transactions, providing a convenient and efficient way for users to complete their transactions within the app.'
              }></StyledText>
          </StyledView>
        );
      case 'termsCondition':
        return (
          <StyledView tw="justify-center pt-5 px-4 ">
            <StyledText
              tw="text-lg font-bold mb-3 text-black text-[22px]"
              text={'Terms and Conditions'}></StyledText>
            <StyledText
              tw="mb-2 text-black text-[18px]"
              text={
                'The policies implemented by Predine are crafted to ensure a seamless and secure experience for users while also addressing the unique challenges associated with pre-ordering in the culinary industry'
              }></StyledText>

            <StyledText
              tw="text-lg font-bold mb-1 text-black text-[20px]"
              text={'Time Policy:'}></StyledText>
            <StyledText
              tw="mb-2 text-black text-[16px]"
              text={
                'Predine provides flexibility to customers when selecting their preferred time slot for order pickup. Customers can choose a time slot that best suits their needs. However, certain considerations come into play:'
              }></StyledText>
            <StyledText
              tw="font-bold mb-1 text-black text-[17px]"
              text={'Minimum Time Requirement:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[14px]"
              text={
                'The minimum wait time for order preparation and pickup may vary based on the size and complexity of the order. Larger orders may have a minimum wait time ranging from 20 to 30 minutes, while smaller orders may have a minimum wait time of 5 to 10 minutes. These time frames are subject to change based on the specific food items and order volume. This time policy ensures a balance between customer convenience and operational efficiency.'
              }></StyledText>

            <StyledText
              tw="text-lg font-bold mb-1 text-black text-[20px]"
              text={'Payment Mode:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[16px]"
              text={
                'Predine accepts online payments exclusively. Customers can make secure payments through the app using various online payment methods. This policy aligns with the modern trend of digital transactions, providing a convenient and efficient way for users to complete their transactions within the app.'
              }></StyledText>
          </StyledView>
        );
      case 'refundPolicy':
        return (
          <StyledView tw="justify-center pt-5 px-4">
            <StyledText
              tw="text-lg font-bold mb-3 text-black text-[22px]"
              text={'Refund Policy'}></StyledText>

            <StyledText
              tw="font-bold mb-1 text-black text-[20px]"
              text={'No Refund Policy:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[16px]"
              text={
                'Predine enforces a strict no refund policy once payment is made. This policy is in place due to the perishable nature of food items. Once an order is confirmed and paid for, no refunds will be allowed. This approach is a preventive measure to minimize food wastage and encourages customers to order responsibly. By making a commitment to their orders, customers contribute to the reduction of unnecessary food disposal.'
              }></StyledText>

            <StyledText
              tw="font-bold mb-1 text-black text-[20px]"
              text={'Refund Exception Policy:'}></StyledText>
            <StyledText
              tw="mb-3 text-black text-[16px]"
              text={
                'In exceptional cases where there is a failure in fulfilling an order, Predine may consider refund requests. This policy acknowledges that unforeseen circumstances or technical glitches may occur, leading to the non-fulfillment of an order. In such cases, Predine is committed to reviewing refund requests and addressing them on a case-by-case basis. This approach demonstrates the platforms dedication to customer satisfaction and fairness.'
              }></StyledText>
          </StyledView>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default ViewPrivacyPolicyCard;

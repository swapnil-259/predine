import {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {
  DialogBox,
  OwnerDetailsCard,
  StyledButton,
  StyledText,
  StyledView,
} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {deleteData, getData, putData} from '../../../services/api/apiService';
import ShowToast from '../../../services/utils/toast';

const ViewOwner = ({route, navigation}) => {
  const buttonInitialState = 'EDIT OWNER';
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [editData, setEditData] = useState(data);
  const [buttonText, setButtonText] = useState(buttonInitialState);
  const [visible, setVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    text: '',
    btnText1: '',
    btnText2: '',
  });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const viewOwners = async () => {
    const data = route.params.id;
    try {
      const res = await getData(apiURL.VIEW_OWNERS, {id: data});
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editOwner = async () => {
    const urlData = editData;
    try {
      const res = await putData(apiURL.OWNER_REGISTRATION, {data: urlData});
      setEditData(editData);
      console.log(editData);
      console.log(res);
    } catch (err) {
      setEditData(data);
      console.log('edtdata', editData);
    }
  };
  const deleteOwner = async () => {
    const data = route.params;
    console.log('hello', data);
    try {
      const res = await deleteData(apiURL.OWNER_REGISTRATION, {data: data});
      navigation.navigate('PanelAuth');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (label, value) => {
    const updatedData = data.map(item => {
      if (item.label === label) {
        return {...item, value};
      }
      return item;
    });
    setEditData(updatedData);
  };

  const onCLickEditButton = () => {
    if (buttonText === buttonInitialState) {
      setEditable(true);
      setButtonText('SUBMIT DATA');
      ShowToast({
        type: 'info',
        title: 'MESSAGE',
        msg: 'Click on text to change the data.',
      });
    } else if (buttonText === 'SUBMIT DATA') {
      setDialogContent({
        title: 'Alert',
        text: 'Do you really want to submit the changes?',
        btnText1: 'Yes',
        btnText2: 'No',
      });
      showDialog();
    }
  };

  const onCLickDeleteButton = () => {
    setDialogContent({
      title: 'Warning',
      text: 'Do you really want to delete the owner?',
      btnText1: 'Delete',
      btnText2: 'Cancel',
    });
    showDialog();
  };
  useEffect(() => {
    viewOwners();
  }, []);

  return (
    <PaperProvider>
      {data.length === 0 ? (
        <StyledView tw="flex-1 bg-white justify-center items-center">
          <StyledText tw="text-black text-[18px]">Loading Data....</StyledText>
        </StyledView>
      ) : (
        <StyledView tw="flex-1 bg-white">
          <OwnerDetailsCard
            data={data}
            editable={editable}
            editData={editData}
            onTextChange={handleTextChange}
            isEdit={true}></OwnerDetailsCard>
          <DialogBox
            visible={visible}
            onDismiss={hideDialog}
            title={dialogContent.title}
            text={dialogContent.text}
            btnText1={dialogContent.btnText1}
            btnText2={dialogContent.btnText2}
            onPressbtn1={() => {
              if (dialogContent.btnText1 === 'Yes') {
                editOwner();
                setEditable(false);
                setButtonText(buttonInitialState);
              } else if (dialogContent.btnText1 === 'Delete') {
                deleteOwner();
              }
              hideDialog();
            }}
            onPressbtn2={hideDialog}></DialogBox>

          <StyledView style={{flexDirection: 'row', justifyContent: 'center'}}>
            <StyledButton
              tw="mr-2"
              label={buttonText}
              onPress={() => onCLickEditButton()}></StyledButton>
            <StyledButton
              tw="ml-2"
              label={'DElETE OWNER'}
              onPress={() => onCLickDeleteButton()}></StyledButton>
          </StyledView>
        </StyledView>
      )}
    </PaperProvider>
  );
};

export default ViewOwner;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container } from "@material-ui/core";
import {
  CustomInput,
  ActionButtons,
  SubmitSection,
  ErrorMsg,
  AligningWrapper,
} from "./styles";
import { Select } from "antd";

const { Option } = Select;

const AddYardForm = ({
  cancelAction,
  addYard,
  deleteYard,
  preLoadedValues,
  isEditing,
  updateYard,
}) => {
 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customError, setCustomError] = useState(null);

  const { handleSubmit, register, errors, reset } = useForm({
    defaultValues: preLoadedValues || {},
  });

  const onSubmit = async (values) => {
    // reset();
    console.log(
      "clicked data submission ===>",
      values,
    );
    const name = values.name;
    const description = values.description;
    const latitude = values.latitude;
    const longitude = values.longitude;
    const radius = values.radius;
    /* const yard_yard = values.yard_yard;
    const unit_id = selectedUnitId;
    const username = values.username;
    const password = values.password; */

    const yard = {
      name,
      description,
      latitude,
      longitude,
      radius,
    };
    console.log('isEditing :', isEditing)
    // if (!selectedUnitId || !selectedDesignationId || !selectedRoleId) {
    //   return;
    // }
    // console.log("from component user data ==>", user);
    // //need to replace updated_by & cerated_by data with user details(need to discuss with backend)
    isEditing
      ? updateYard({
        ...preLoadedValues,
        ...yard,
        //       created_by: "temp",
        //       updated_by: "temp",
      })
      : addYard(yard);
    // addUser(user);
  };

  /* const handleUnitChange = (value) => {
    setSelectedCategory(value);
    if (selectedCategory)
      setCustomError(null);
  }; */

  // useEffect(() => {
  //   fetchComponentData();
  // }, []);

  // // need to move to redux thunks after demo
  // const fetchComponentData = async () => {
  //   const units = await fetchUnits();
  //   setUnits(units);
  //   console.log("fetched from form ==>", units);
  // };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="name"
          placeholder={"Name"}
          ref={register({
            required: "Required",
            validate: (value) => value.length != 0,
          })}
        />
        <ErrorMsg>{errors.name && "Provide Name"}</ErrorMsg>
        <CustomInput

          name="description"
          placeholder={"Description"}
          ref={register({
            required: "Required",
            validate: (value) => value.length != 0,
          })}
        />
        <ErrorMsg>{errors.description && "Provide Description"}</ErrorMsg>

        <CustomInput
          placeholder={"Latitude"}
          name="latitude"
          ref={register({
            required: "Required",
            validate: (value) => value.length != 0,
          })}
        />
        <ErrorMsg>{errors.latitude && "Provide Latitude"}</ErrorMsg>
        <CustomInput
          placeholder={"Longitude"}
          name="longitude"
          ref={register({
            required: "Required",
            validate: (value) => value.length != 0,
          })}
        />
        <ErrorMsg>{errors.longitude && "Provide Longitude"}</ErrorMsg>

        <CustomInput
          placeholder={"Radius"}
          name="radius"
          ref={register({
            required: "Required",
            validate: (value) => value.length != 0,
          })}
        />
        <ErrorMsg>{errors.radius && "Provide Radius"}</ErrorMsg>


        {/* <AligningWrapper>
          <Select
            style={{ width: "100%" }}
            name = "category"
            placeholder="Select Category"
            onChange={handleUnitChange}
            
          >
           
                <Option value={"Security"}>Security</Option>
                <Option value={"Safety"}>Safety</Option>
                <Option value={"PPE"}>PPE</Option>
             
          </Select>
        </AligningWrapper>
 */}
        

        <SubmitSection>
          <ActionButtons onClick={() => cancelAction(null)}>
            Cancel
          </ActionButtons>
          <ActionButtons isSubmit type="submit">
            Submit
          </ActionButtons>
        </SubmitSection>
      </form>
    </Container>
  );
};

export default AddYardForm;

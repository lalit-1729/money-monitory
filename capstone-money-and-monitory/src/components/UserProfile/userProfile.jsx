// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Card, CardContent, Typography, Container, Grid, Box, Avatar } from '@mui/material';
// import { useRef } from 'react';

// const UserProfile = () => {
//   // const [userData, setUserData] = useState(null);

//   const [formValues, setFormValues] = useState({
//     firstName: 'John',
//     lastName: 'Title',
//     email: 'john@title.com',
//     dob: '2000-12-08',
//     photo: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3777943.jpg&fm=jpg',
//   });

//   useEffect(async()=>{
      
//       //api call load the user information
//       const data = await axios.get(`http://localhost:8010/api/v1/users/getUserDetails/${email}`)
//           .then(response => {
//             setUserData(response.data);
//           })
//           .catch(error=> {
//             console.error(error);
//           });
//         setFormValues(...prevState, {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           dob: data.dob,
//           photo: data.photo,
//         })
//   }, []);


//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const fileRef = useRef();

//   const onAvatarClick = (e) => {
//     fileRef.current.click();
//   }

//   const onFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     console.log(uploadedFile);
//    const objectUrl = URL.createObjectURL(uploadedFile);

//     // var reader = new FileReader();
//     // reader.readAsDataURL(uploadedFile);
//     // reader.onload = function (){
//     //   const bytes = reader.result;
//     //   console.log('photo', bytes);
//     // }
//     // reader.onerror = function (err){
//     //   console.log('Err', err);
//     // }
//     setFormValues({...formValues, photo: objectUrl});
//   }


//   const handleUpdate = async () => {
//     try{
//       const data = {
        
//       };
//       const apiUrl = `http://localhost:8010/api/v1/users/updateUserEntries/${email}`;

//       const response = await axios.put(apiUrl, data);

//       if (response.status === 200) {
//         alert("Profile updated successfully");
//       } else {
//         console.error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error in updating profile: ", error);
//     }
//   }

//   return (
//     <Container maxWidth="md">
//       <Card style={{margin: '1rem'}}>
//         <CardContent>
//           <Typography variant="h5">User Profile</Typography>
          
//           <Box sx={{m: 4}}/>
//           <form onSubmit={()=>{}}>
//           {/* {userData && ( */}
//           <Grid container>
//           <Grid item xs={2}  style={{'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}>
//             <Avatar onClick={onAvatarClick} src={formValues.photo} sx={{width: 100, height: 100}} style={{textAlign: "center"}}/>            
//           </Grid>
//             <Grid container spacing={2} xs={10}>
//               <Grid item xs={6} >
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   value={formValues.firstName}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   value={formValues.lastName}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={7}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formValues.email}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={5}>
//                 <TextField
//                   fullWidth
//                   label="DOB"
//                   name="dob"
//                   defaultValue={formValues.dob}
//                   onChange={handleInputChange}
//                   type='date'
//                 />
//               </Grid>
//             </Grid>

//             <Grid marginTop={2} container marginRight={2} justifyContent={'flex-end'}>
              
//             <Button
//               variant="contained"
//               color="primary"
//               type='submit'
//               onClick={handleUpdate}
//             >
//               Update
//             </Button>
//             </Grid>
//             </Grid>
//           {/* )} */}
//             <input onChange={onFileChange} ref={fileRef} type='file' name='photo' style={{display: 'none'}}/>
//           </form>
          
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default UserProfile;

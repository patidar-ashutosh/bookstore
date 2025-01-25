// import { layoutDesign } from "../../service/layoutDesign";

// export class Pay {

//     public payWithNetBanking(bankName : string, userId : string, passWord : string) : boolean {

//         let {createLine, centerText} = layoutDesign.designTheOutput();
//         const boxWidth : number = 60; // Width of the box

//         const correctUserName : string = "test@123";
//         const correctPassword : string = "test@test";

//         console.log(createLine(boxWidth, "="));

//         if (userId === correctUserName && passWord === correctPassword) {
//             console.log(centerText(`You Pay With ${bankName} Bank`, boxWidth));
//             console.log(centerText("You have Successfully paid with NetBanking...", boxWidth));
//             return true;
//         }else{
//             console.log(centerText("Your Payments Has Failed...try Again...", boxWidth));
//             return false;
//         }
//     }

//     public payWithCard(cardNumber : number, cvv : number) : boolean {

//         let {createLine, centerText} = layoutDesign.designTheOutput();
//         const boxWidth : number = 60; // Width of the box

//         const correctCardNumber : number = 1234456312345678;
//         const correctCvv : number = 455;

//         console.log(createLine(boxWidth, "="));

//         if (cardNumber === correctCardNumber && cvv === correctCvv ) {
//             console.log(centerText("You Pay With Card : ", boxWidth));
//             console.log(centerText("You have Successfully Paid With Card...", boxWidth));
//             return true;
//         }else {
//             console.log(centerText("Your Payments Has Failed...try Again...", boxWidth));
//             return false;
//         }
//     }

//     public payWithUpi(upiId : string) : boolean {
//         const correctUpi : string = "test@ybl";

//         let {createLine, centerText} = layoutDesign.designTheOutput();
//         const boxWidth : number = 60; // Width of the box

//         console.log(createLine(boxWidth, "="));

//         if (upiId === correctUpi) {
//             console.log(centerText('You Pay With An Upi : ', boxWidth));
//             console.log(centerText('Gathering payment request In Your UpiApp...', boxWidth));
//             console.log(centerText('Processing your payment...', boxWidth));
//             console.log(centerText('You have Successfully Paid With Upi...', boxWidth));
//             return true;
//         } else {
//             console.log(centerText("Your Payments Has Failed...try Again...", boxWidth));
//             return false;
//         }
//     }

// }
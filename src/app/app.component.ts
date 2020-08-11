import { Component, OnInit } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TypeRacer';

  ngOnInit() {
    Amplify.configure({
      Auth: {
        identityPoolId: 'us-east-2_xrrasRJ0P', // Amazon Cognito Identity Pool ID
        region: 'us-east-2', // Amazon Cognito Region
      }
    });
    Auth.configure({
      region: 'us-east-2',
      userPoolId: 'us-east-2_xrrasRJ0P',
      userPoolWebClientId: '30l2p664pdpgkr4me7ef051smd',
    });
    // authenticationFlowType: 'USER_PASSWORD_AUTH',
  }
}

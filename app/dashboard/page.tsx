import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Page() {

  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <SignedOut>
            <SignInButton />
            What
          </SignedOut>
          <SignedIn>
            <UserButton />
            Nah
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}

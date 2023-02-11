import React, { useCallback, useState } from 'react'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'

import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors';
import humanizeString from 'humanize-string'
import { Box } from '@mui/material'

interface InviteCardProps {
  email: string
  accepted: boolean
  deleted: boolean
  invitedAt: string
  invitationLink: string
}

export default function InviteCard(props: InviteCardProps) {
  const { email, accepted, invitedAt, invitationLink } = props
  const [notification, setNotification] = useState<string | null>(null)

  const copyInviteLink = useCallback(({  }) => {
    navigator.clipboard.writeText(invitationLink)
    if (typeof (navigator.clipboard) == 'undefined') {
      const textArea = document.createElement("textarea");
      textArea.value = invitationLink;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea)
    } else {
      navigator.clipboard.writeText(invitationLink)
    }
    setNotification('Copied to clipboard')
    setTimeout(() => setNotification(null), 2000)
  }, [])

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          {humanizeString(email[0]) || 'Unknown'}
        </Avatar>
        <Typography gutterBottom variant="h5" component="div" sx={{ 
          fontSize: 'smaller',
          margin: 0,
          width: '100%',
          marginLeft: '5%',
          textAlign: 'left',
          textOverflow: 'ellipsis' }} >
          {email}
        </Typography>
        </Box>
      </CardContent>
      <CardContent sx={{textAlign: 'left'}}>
        <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
          {`Invite is ${accepted ? '' : 'not'} accepted.`}
        </Typography>
        </CardContent>
      <CardActions>
        <Button onClick={copyInviteLink} size="small">Copy invitation link</Button>
      </CardActions>
      {notification && <Alert 
        sx={{
          position: 'fixed',
          left: 40,
          bottom: 40,
          zIndex: 1000
        }}
        variant='standard' severity='success' >
          {notification}
        </Alert>}
    </Card>
  )
}

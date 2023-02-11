export interface Invite {
  email: string
  accepted: boolean
  deleted: boolean
  invitedAt: string
  invitationCode: string
  invitationLink: string
}

export type createInviteType = Omit<Invite, 'accepted' | 'invitationCode' | 'deleted' | 'invitedAt' | 'invitationLink'>

export type Invites = Invite[]
export type InviteResponse = { invites: Invites }

export type InviteFormType = { email: string }

"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1810],{91493:function(e,t,a){a.d(t,{Z:function(){return W}});var n,i=a(97410),r=a(34608),l=a(29935),s=a(72988),o=a(68106),d=a(42420),u=a(56032),c=a(18939),m=a.n(c),f=a(92379),p=a(75172),g=a(62984),v=a(9519),b=a(19841),h=a(68306),x=a(75592),M=a(67526),j=a(80197),w=a(48198),N=a(651);function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(Object(a),!0).forEach(function(t){(0,i.Z)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function P(e){return e.split(/[\s,]+/)}function I(e){let{value:t,onChange:a,className:n}=e,i=(0,p.Z)(),{0:r,1:l}=(0,f.useState)(""),s=(0,f.useCallback)(e=>{if(r)switch(e.key){case"Enter":case",":case" ":a([...t,...P(r).map(S)]),l(""),e.preventDefault()}},[r,a,t]);return(0,N.jsx)(x.ZP,{className:(0,b.default)("react-select-container",n),isMulti:!0,onBlur:e=>{r&&(a([...t,...P(r).map(S)]),l(r),e.preventDefault())},classNamePrefix:"react-select",components:O,inputValue:r,isClearable:!0,menuIsOpen:!1,onChange:a,onInputChange:l,onKeyDown:s,placeholder:i.formatMessage(C.placeholder),value:t,"aria-labelledby":"add-emails-label",name:"add-member-emails"})}let S=e=>({label:e,value:e,isValid:o.F.test(e)}),O={DropdownIndicator:()=>null,IndicatorsContainer:()=>null,ClearIndicator:()=>null,MultiValueRemove:()=>null,MultiValue:e=>{let t=(0,p.Z)(),a=(0,N.jsxs)("span",{className:"flex items-center gap-1",children:[(0,N.jsx)("span",{children:e.children}),(0,N.jsx)(w.tPq,{className:"icon-sm"})]}),n=e.data.isValid?a:(0,N.jsx)(j.u,{label:t.formatMessage(C.tooltipInvalidEmail,{email:e.data.value}),side:"top",children:a});return(0,N.jsx)(M.c.MultiValue,k(k({},e),{},{children:(0,N.jsx)("button",{className:(0,b.default)("m-1 cursor-pointer rounded-full border border-transparent py-1 pl-3 pr-2 text-sm text-token-text-primary",e.data.isValid?"bg-token-main-surface-secondary hover:border-token-border-medium hover:bg-token-main-surface-tertiary":"bg-red-200 text-red-500"),onClick:t=>{var a,n;null===(a=(n=e.removeProps).onClick)||void 0===a||a.call(n,t),t.preventDefault()},"aria-label":t.formatMessage(C.removeMember,{member:e.data.value}),children:n})}))}},C=(0,h.vU)({membersAdded:{id:"emailsTextarea.membersAdded",defaultMessage:"+{count} {count, plural, one {member} other {members}}"},removeMember:{id:"emailsTextarea.removeMember",defaultMessage:"Remove {member}"},tooltipInvalidEmail:{id:"emailsTextarea.tooltipInvalidEmail",defaultMessage:'"{email}" may not be a valid email'},clearAllEntries:{id:"emailsTextarea.clearAllEntries",defaultMessage:"Clear all"},placeholder:{id:"emailsTextarea.placeholder",defaultMessage:"Type an email and press enter..."}});var T=a(11121),Z=a(76781),A=a(77313),R=a(47797),E=a(31161),V=a(41508);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function D(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(Object(a),!0).forEach(function(t){(0,i.Z)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}let B=((n={})[n.INITIAL=0]="INITIAL",n[n.CSV_TABLE=1]="CSV_TABLE",n);function W(e){let{workspace:t,canResendInviteEmails:a,onCancel:n,cancelButtonText:i,onSuccess:c,fullWidthButtons:b=!1}=e,h=t.isOwnerOfAccount(),{0:x,1:M}=(0,f.useState)(!1),{0:j,1:y}=(0,f.useState)(!1),k=(0,f.useRef)(null),P=t.isTeam(),S=(0,p.Z)(),{0:O,1:C}=(0,f.useState)(!0),{0:L,1:W}=(0,f.useState)(!1),{0:z,1:H}=(0,f.useState)(B.INITIAL),{0:U,1:q}=(0,f.useState)([]),{0:G,1:$}=(0,f.useState)([]),{mutateAsync:K}=function(e,t){let a=(0,p.Z)(),n=(0,d.NL)();return(0,u.D)({mutationFn:async t=>{let{emails:n,role:i,resendEmails:r}=t,l=[],o=Math.max(5,Math.round(n.length/10));for(let e=0;e<n.length;e+=o)l.push(n.slice(e,e+o));let d=async t=>s.Z.addWorkspaceUsers(e,t,i,r).then(e=>(e.errored_emails.length>0&&E.m.danger(a.formatMessage(F.inviteMessageFailure,{emailsStr:e.errored_emails.map(e=>{let{email_address:t,error:a}=e;return"".concat(t,": ").concat(a)}).join(", ")})),e.account_invites)).catch(e=>{throw E.m.danger(e.message),e});return(await Promise.all(l.map(e=>d(e)))).flat()},onSuccess:()=>{n.invalidateQueries({queryKey:["workspace","invites",e]}),null==t||t()}})}(t.id,c),J=_(h),Q=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){let e=await new Promise(e=>{if(a.size/1048576>25)e({status:"error",reason:"file_too_large"});else if("text/csv"!==a.type)e({status:"error",reason:"invalid_file_type"});else{let t=new FileReader;t.readAsText(a),t.onload=function(t){var a;let n=j,i=(null===(a=t.target)||void 0===a?void 0:a.result).split("\n"),r=new Set;e({status:"success",newRows:i.reduce((e,t)=>{let[a,i]=t.split(",").map(e=>e.trim());if(o.F.test(a)&&!r.has(a)){var l;void 0!==J[i]||n||(n=!0),e.push({email:a,role:null!==(l=J[i])&&void 0!==l?l:J.member})}return r.add(a),e},[]),hasWarning:n})}}});"success"===e.status?(q(e.newRows),H(B.CSV_TABLE),y(e.hasWarning)):"file_too_large"===e.reason?E.m.danger(S.formatMessage(F.fileTooLargeWarning,{maxSize:"".concat(25,"MB")}),{duration:5}):"invalid_file_type"===e.reason&&E.m.danger(S.formatMessage(F.fileIncorrectTypeWarning),{duration:5})}},X=(e,t,a)=>{let n=[...U];n[e]=D(D({},n[e]),{},{[t]:a}),q(n)},Y=e=>{q([...U.slice(0,e),...U.slice(e+1)])},ee=(0,f.useCallback)(()=>{q([]),H(B.INITIAL),W(!1),$([])},[]),et=async()=>{W(!0);try{U.length>5&&E.m.info(S.formatMessage(F.inviteMessageLoading,{numRows:U.length}),{hasCloseButton:!0});let e=[["admin",r.r3.ADMIN],["owner",r.r3.OWNER],["member",r.r3.STANDARD]],a=(await Promise.all(m()(e.map(e=>{let[t,a]=e,n=U.filter(e=>e.role===t).map(e=>e.email);return n.length>0&&K({emails:n,role:a,resendEmails:O})})))).flat().length;a>0&&E.m.success(S.formatMessage(F.inviteSuccessToast,{numRows:a,userStr:1===a?"user":"users",workspaceName:(0,V.CV)(S,t)})),null==c||c(),ee()}finally{W(!1)}},ea=(0,N.jsx)(v.z,{color:"primary",size:b?"large":"medium",disabled:L||0===U.length,onClick:et,children:L?S.formatMessage(F.inviteMemberInviteSubmitButtonLoading):S.formatMessage(F.inviteMemberInviteSubmitButton)}),en=(0,N.jsx)(v.z,{color:"primary",size:b?"large":"medium",disabled:0===G.length,onClick:()=>{let e=new Set;q(G.reduce((t,a)=>(e.has(a.value)||t.push(a.value),e.add(a.value),t),[]).map(e=>({email:e,role:J.member}))),H(B.CSV_TABLE)},children:S.formatMessage(F.inviteMemberInviteNextButton)});return(0,N.jsxs)("div",{className:"flex flex-col gap-2",children:[z===B.INITIAL&&(0,N.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,N.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,N.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,N.jsx)("label",{htmlFor:"upload-csv",id:"upload-csv-label",children:(0,N.jsx)(g.Z,D({},F.importCSVLabel))}),(0,N.jsxs)("span",{className:"text-sm text-token-text-tertiary",children:[(0,N.jsx)(g.Z,D(D({},x?F.helperCSVFormatHide:F.helperCSVFormatShow),{},{values:{link:e=>(0,N.jsx)("button",{className:"underline",onClick:()=>{M(!x)},children:e})}})),x&&(0,N.jsx)("pre",{className:"mt-4",children:"email,role\nuser1@company.com,member\nadmin@company.com,admin\nit@company.com,owner"})]})]}),(0,N.jsx)("input",{ref:k,type:"file",accept:".csv,text/csv",id:"upload-csv",className:"hidden",onChange:Q}),(0,N.jsx)(v.z,{color:"secondary",onClick:()=>{var e;return null===(e=k.current)||void 0===e?void 0:e.click()},children:(0,N.jsx)(g.Z,D({},F.importCSVButton))})]}),(0,N.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,N.jsx)("label",{htmlFor:"add-member-emails",id:"add-emails-label",children:(0,N.jsx)(g.Z,D({},F.addEmailsFieldName))}),(0,N.jsx)(I,{value:G,onChange:$})]})]}),z===B.CSV_TABLE&&(0,N.jsxs)(N.Fragment,{children:[j&&(0,N.jsxs)("div",{className:"flex w-full items-center bg-yellow-100 p-4",children:[(0,N.jsx)(w.ETw,{className:"icon-sm mr-2 text-yellow-700"}),(0,N.jsx)("div",{className:"flex-grow text-yellow-700",children:(0,N.jsx)(g.Z,D({},F.unspecifiedRoleDescription))})]}),(0,N.jsxs)(R.Z.Root,{size:"normal",children:[(0,N.jsxs)(R.Z.Header,{children:[(0,N.jsx)(R.Z.HeaderCell,{children:(0,N.jsx)(g.Z,D({},F.inviteTableHeaderEmail))}),(0,N.jsx)(R.Z.HeaderCell,{className:"pl-3 dark:bg-gray-900",children:(0,N.jsx)(g.Z,D({},F.inviteTableHeaderRole))}),(0,N.jsx)(R.Z.HeaderCell,{})]}),(0,N.jsx)(R.Z.Body,{children:U.map((e,t)=>(0,N.jsxs)(R.Z.Row,{children:[(0,N.jsx)(R.Z.Cell,{children:(0,N.jsx)(T.Z,{name:"email",type:"email",value:e.email,onChange:e=>X(t,"email",e.target.value),color:"neutral"})}),(0,N.jsx)(R.Z.Cell,{children:(0,N.jsxs)(A.Z.Root,{value:e.role,onValueChange:e=>X(t,"role",e),children:[(0,N.jsxs)(A.Z.Trigger,{children:[(0,N.jsx)(A.Z.Value,{}),(0,N.jsx)(A.Z.Icon,{})]}),(0,N.jsx)(A.Z.Portal,{children:(0,N.jsxs)(A.Z.Content,{className:"border border-token-main-surface-secondary",children:[(0,N.jsx)(A.Z.Item,{value:J.member,children:(0,N.jsx)(g.Z,D({},F.inviteRoleMember))}),J.admin&&(0,N.jsx)(A.Z.Item,{value:J.admin,children:(0,N.jsx)(g.Z,D({},F.inviteRoleAdmin))}),J.owner&&(0,N.jsx)(A.Z.Item,{value:J.owner,children:(0,N.jsx)(g.Z,D({},F.inviteRoleOwner))})]})})]})}),(0,N.jsx)(R.Z.Cell,{textAlign:"right",children:(0,N.jsx)(w.XHJ,{onClick:()=>Y(t),className:"icon-sm mr-2 cursor-pointer text-token-text-secondary"})})]},t))})]})]}),a&&C&&(0,N.jsx)("div",{className:"mt-2 flex items-center text-left text-token-text-secondary",children:(0,N.jsx)(l.Z,{id:"resend-emails",checked:O,onChange:e=>C(e.currentTarget.checked),label:S.formatMessage(F.resendEmailsFieldName)})}),z===B.INITIAL&&P&&(0,N.jsx)("div",{className:"mb-4",children:(0,N.jsx)(Z.Z,{children:(0,N.jsx)(g.Z,D({},F.teamInviteModalNote))})}),(0,N.jsxs)("div",{className:"flex justify-end gap-2",children:[(0,N.jsx)(v.z,{color:"secondary",size:b?"large":"medium",onClick:()=>{z!==B.INITIAL?H(B.INITIAL):(ee(),n())},children:z===B.INITIAL?i:S.formatMessage(F.inviteMemberInviteBackButton)}),z===B.INITIAL?en:ea]})]})}let _=e=>{let t={member:"member"};return e&&(t.admin="admin",t.owner="owner"),t},F={importCSVLabel:{id:"adminPage.importCSVLabel",defaultMessage:"Import from CSV",description:"Name of label for import from CSV button"},helperCSVFormatHide:{id:"adminPage.helperCSVFormat",defaultMessage:'The file must include email and an optional role on each line. Roles can be "member", "admin", or "owner". <link>Hide Example</link>',description:"Instructions for formatting the import CSV, with a link to hide the example"},helperCSVFormatShow:{id:"adminPage.helperCSVFormat",defaultMessage:'The file must include email and an optional role on each line. Roles can be "member", "admin", or "owner". <link>Show Example</link>',description:"Instructions for formatting the import CSV, with a link to show an example"},importCSVButton:{id:"adminPage.importCSVButton",defaultMessage:"Upload",description:"Name of upload from CSV button"},addEmailsFieldName:{id:"adminPage.addEmailsFieldName.0",defaultMessage:"Emails",description:"Name of input for adding emails to workspace"},unspecifiedRoleDescription:{id:"adminPage.unspecifiedRoleDescription",defaultMessage:"Roles that were unspecified have been changed to Member.",description:"Description text for defaulting invite roles to member"},inviteTableHeaderEmail:{id:"adminPage.inviteTableHeaderEmail",defaultMessage:"Email",description:"Label for email column of invite table header"},inviteTableHeaderRole:{id:"adminPage.inviteTableHeaderRole",defaultMessage:"Role",description:"Label for role column of invite table header"},inviteRoleMember:{id:"adminPage.inviteRoleMember",defaultMessage:"Member",description:"Member role for workspace invite"},inviteRoleAdmin:{id:"adminPage.inviteRoleAdmin",defaultMessage:"Admin",description:"Admin role for workspace invite"},inviteRoleOwner:{id:"adminPage.inviteRoleOwner",defaultMessage:"Owner",description:"Owner role for workspace invite"},fileTooLargeWarning:{id:"adminPage",defaultMessage:"File is too large. Please upload a CSV file smaller than {maxSize}.",description:"Error when uploading a file that is too large"},fileIncorrectTypeWarning:{id:"adminPage",defaultMessage:"Please upload a CSV file.",description:"Error when uploading a file that is not a CSV"},resendEmailsFieldName:{id:"adminPage.resendEmailsFieldName",defaultMessage:"Resend emails for existing invites",description:"Name of checkbox input for resending emails to workspace"},teamInviteModalNote:{id:"adminPage.teamInviteModalNote",defaultMessage:"Users that accept invites will be included as additional seats on your next invoice.",description:"Note for team plan invites that additional seats will be charged"},inviteMessageLoading:{id:"adminPage.inviteMessageLoading",defaultMessage:"Sending out {numRows} invites, this may take a minute...",description:"Loading message when invites are being sent"},inviteSuccessToast:{id:"adminPage.inviteSuccessToast",defaultMessage:"Invited {numRows} {userStr} to {workspaceName}",description:"Message on successfully sending out invites"},inviteMemberInviteNextButton:{id:"adminPage.inviteMemberInviteNextButton",defaultMessage:"Next",description:"The title of the invite member modal next button"},inviteMemberInviteSubmitButton:{id:"adminPage.inviteMemberInviteSubmitButton",defaultMessage:"Send invites",description:"The title of the invite member modal submit button"},inviteMemberInviteSubmitButtonLoading:{id:"adminPage.inviteMemberInviteSubmitButtonLoading",defaultMessage:"Sending invites...",description:"Button label while inviting members"},inviteMemberInviteBackButton:{id:"adminPage.inviteMemberInviteBackButton",defaultMessage:"Back",description:"The title of the invite member modal back button"},inviteMessageFailure:{id:"adminPage.inviteMessageFailure",defaultMessage:"Unable to invite {emailsStr}",description:"Message that shows which emails were unsuccessful at being invited"}}},41508:function(e,t,a){a.d(t,{$3:function(){return c},Ap:function(){return o},CV:function(){return m},GA:function(){return u},Gk:function(){return b},bE:function(){return h},cI:function(){return p},eA:function(){return f},my:function(){return v},qH:function(){return d}});var n=a(34608),i=a(44575),r=a(25968),l=a(92379),s=a(75172);function o(){let e=(0,s.Z)(),t=e.formatMessage(x.adminRoleName),a=e.formatMessage(x.ownerRoleName),i=e.formatMessage(x.standardRoleName);return(0,l.useMemo)(()=>({[n.r3.OWNER]:a,[n.r3.ADMIN]:t,[n.r3.STANDARD]:i}),[a,t,i])}function d(e){let t=(0,s.Z)(),a=null==e?void 0:e.isTeam(),n=null==e?void 0:e.isEnterprise(),i=null==e?void 0:e.isEdu();if(e){if(a)return t.formatMessage(x.teamPlanName);if(n)return t.formatMessage(x.enterprisePlanName);if(i)return t.formatMessage(x.eduPlanName)}return t.formatMessage(x.personalPlanName)}function u(e){return m((0,s.Z)(),e)}function c(){let e=(0,i.t)();return m((0,s.Z)(),e)}function m(e,t){var a;return null==t||t.isPersonalAccount()?e.formatMessage(x.personalWorkspaceTitle):null!==(a=t.data.name)&&void 0!==a?a:e.formatMessage(x.defaultWorkspaceTitle)}function f(){var e;let t=(0,r.aF)();return null!==(e=null==t?void 0:t.email)&&void 0!==e?e:null}function p(){var e,t;let a=(0,r.aF)();return null!==(e=null!==(t=null==a?void 0:a.name)&&void 0!==t?t:null==a?void 0:a.email)&&void 0!==e?e:null}function g(){return(0,r.ec)(e=>{let{workspaces:t}=e;return t})}function v(){var e;let{data:t}=(0,i.rk)();return null!==(e=null==t?void 0:t.accountItems.filter(e=>!e.isDeactivated()))&&void 0!==e?e:[]}function b(e){let t=g().find(t=>t.id===e);return(null==t?void 0:t.role)===n.r3.OWNER}function h(e){let t=g().find(t=>t.id===e);return(null==t?void 0:t.role)===n.r3.ADMIN}let x=(0,a(68306).vU)({defaultWorkspaceTitle:{id:"useWorkspaces.defaultWorkspaceTitle",defaultMessage:"Untitled Workspace"},personalWorkspaceTitle:{id:"useWorkspaces.personalWorkspaceTitle",defaultMessage:"Personal account"},personalPlanName:{id:"useWorkspaces.personalPlanName",defaultMessage:"Personal"},enterprisePlanName:{id:"useWorkspaces.enterprisePlanName",defaultMessage:"Enterprise"},eduPlanName:{id:"useWorkspaces.eduPlanName",defaultMessage:"Edu"},teamPlanName:{id:"useWorkspaces.teamPlanName",defaultMessage:"Team"},adminRoleName:{id:"useWorkspaces.adminRoleName",defaultMessage:"Admin"},ownerRoleName:{id:"useWorkspaces.ownerRoleName",defaultMessage:"Owner"},standardRoleName:{id:"useWorkspacews.standardRoleName",defaultMessage:"Member"}})},48454:function(e,t,a){a.d(t,{A:function(){return p},b:function(){return g}});var n=a(97410),i=a(69923),r=a(54031),l=a(94035),s=a(17958),o=a(90681),d=a(19698),u=a(43612),c=a(32307);function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach(function(t){(0,n.Z)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function p(e,t,a){return t?i.Ho.LoginWebAuth0:i.Ho.Auth0}function g(){let e=(0,c.useRouter)(),{value:t}=(0,d.fW)("1198030896"),a=(0,i._0)((0,o.xb)("1977905538").config.value),n=(0,s.L)();return function(){let{authType:s="signup",callbackUrl:o="/",additionalAuthParams:d={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=p(e,t,a.forwardToAuthApi),m=n();return(0,u.signIn)(c,{callbackUrl:o},f(f(f(f({prompt:"login",screen_hint:s},(0,r.gk)((0,l.f3)())),(0,i.zC)(a)),m?{use_email_otp:"true"}:{}),d)),c}}},68106:function(e,t,a){a.d(t,{F:function(){return n}});let n=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/},54031:function(e,t,a){a.d(t,{gk:function(){return i}});var n=a(99734);function i(e){return{"ext-statsig-tier":n.uG,"ext-oai-did":e}}},17958:function(e,t,a){a.d(t,{L:function(){return i}});var n=a(19698);function i(){let{layer:e}=(0,n.AH)("1346366956");return()=>e.get("use_email_otp",!1)}}}]);
//# sourceMappingURL=1810-50d9274ca6601567.js.map
const API_ROUTES = {
  // Endpoints relacionados con la Autenticación
  auth: {
    login: '/auth/login',         // POST /auth/login
    // El registro de usuarios no aparece explícitamente como /auth/register
  },
  
  // Endpoints relacionados con Usuarios
  users: {
    list: '/users/',              // GET /users/
    create: '/users/',            // POST /users/
  },

  // Endpoints relacionados con Receptores (Recipients)
  recipients: {
    list: '/recipients/',         // GET /recipients/
    create: '/recipients/',       // POST /recipients/
  },

  // Endpoints relacionados con Correos Fraudulentos (Fraudulent Emails)
  fraudulentEmails: {
    classify: '/emails/classify', // POST /emails/classify (Clasificar y almacenar)
    getRecipients: (emailId) => `/emails/${emailId}/recipients`, // GET /emails/{email_id}/recipients
  },

  // Endpoints relacionados con Receptores de Correos Fraudulentos (Links)
  fraudulentEmailRecipients: {
    listLinks: '/email-recipients/', // GET /email-recipients/
    linkRecipient: '/email-recipients/', // POST /email-recipients/ (Linkear Receptor)
  },
};

export default API_ROUTES;
import styled from 'styled-components';

import theme from '../theme';

const Button = styled.button`
  background: #000000;
  border: 1px solid ${theme.palette.primary.main};
  border-radius: ${theme.spacing()};
  color: ${theme.palette.primary.main};
  padding: 32px 80px 32px 80px;
  ${theme.typography.button};
`;

export default Button;

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableOrder from '../TableOrder/TableOrder.jsx';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const MilestonesTableHeaderCell = (props) => {
  const {
    order, setOrder, sort, setSort, cell,
  } = props;
  return (
    <>
      {(cell.value !== 'name' && cell.value !== 'user' && cell.value !== 'participants') ? (
        <StyledTableCell
          className='cell-pointer cell'
          align="center"
          onClick={() => {
            setSort(cell.value);
            setOrder(!order);
          }}
        >

          {cell.label}
          <TableOrder
            order={order}
            setOrder={setOrder}
            cell={cell.value}
            sort={sort}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell
          align="center"
        >
          {cell.label}
        </StyledTableCell>
      )}
    </>
  );
};

export default MilestonesTableHeaderCell;

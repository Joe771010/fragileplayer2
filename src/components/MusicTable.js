import React, {Component} from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/musicTableStyle.js'

class EnhancedTableHead extends Component {
  headerColumns = [
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'artist', numeric: false, disablePadding: false, label: 'Artist' },
  ];

  render() {
    const {classes} = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className={classes.header}>
            <Checkbox
              onChange={this.props.event_onSelectAll}
            />
          </TableCell>
          {this.headerColumns.map(row => {
            return (
              <TableCell
                className={classes.header}
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                <TableSortLabel
                  active={row.id===this.props.orderBy}
                  direction={this.props.order}
                  onClick={() => this.props.event_onSortLabelClick(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}



class EnhancedTable extends Component {
  render() {
    const {classes, page, rowsPerPage} = this.props;
    const count = this.props.songs.length
    return (
      <Paper>
        <div className={classes.table}>
          <Table padding='dense'>
            <EnhancedTableHead
              classes={classes}
              order = {this.props.order}
              orderBy = {this.props.orderBy}
              event_onSortLabelClick = {this.props.event_onSortLabelClick}
              event_onSelectAll = {this.props.event_onSelectAll}
            />
            <TableBody>
              {this.props.songs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(song => {
                return (
                  <TableRow
                    hover
                    onClick = {(event) => this.props.event_onSelect(event, song.id)}
                    onDoubleClick = {()=>this.props.event_onDoubleClick(song)}
                    key = {song.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={this.props.selected.includes(song.id)}/>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {song.title}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {song.artist}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          labelRowsPerPage='每頁顯示: '
          count = {count}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 25, count<50? 50:count]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.props.event_onChangePage}
          onChangeRowsPerPage={this.props.event_onChangeRowsPerPage}
        />
      </Paper>
    )
  }
}


class MusicTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <EnhancedTable
          classes={classes}
          totalCount = {this.props.totalCount}
          songs = {this.props.songs}
          order = {this.props.order}
          orderBy = {this.props.orderBy}
          selected = {this.props.selected}
          page = {this.props.page}
          rowsPerPage = {this.props.rowsPerPage}
          event_onSortLabelClick = {this.props.event_onSortLabelClick}
          event_onSelect = {this.props.event_onSelect}
          event_onSelectAll = {this.props.event_onSelectAll}
          event_onChangePage = {this.props.event_onChangePage}
          event_onChangeRowsPerPage = {this.props.event_onChangeRowsPerPage}
          event_onDoubleClick={this.props.event_onDoubleClick}
        />
      </div>
    )
  }
}

export default withStyles(styles)(MusicTable)

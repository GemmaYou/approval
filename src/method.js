import { assign } from './lib.js';
export default {
  /*
   * 動態設置 ApprovalTree 選項參數
   * @param {Object} [options] - 更新預設參數
   */
  setOptions ( setOpt = {} ) {
    let { options } = this;
    const currentOptions = assign( {}, options, $.isPlainObject( setOpt ) && setOpt );

    this.init( currentOptions );
  },
  /*
   * destroy ApprovalTree
   */
  destroy () {
    let ele = document.querySelector( this.element );
    while ( ele.firstChild ) {
      ele.removeChild( ele.firstChild );
    }
  },

}
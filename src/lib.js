/**
 * Extend object
 * @param {*} target - The target object to extend.
 * @param {*} args - The rest objects for merging to the target object.
 * @returns {Object} The extended object.
 */
export const assign = Object.assign || function assign ( target, ...args ) {
  if ( $.isPlainObject( target ) && args.length > 0 ) {
    args.forEach( ( arg ) => {
      if ( $.isPlainObject( arg ) ) {
        Object.keys( arg ).forEach( ( key ) => {
          target[key] = arg[key];
        } );
      }
    } );
  }

  return target;
};

/**
 * Extend object
 * @param {String} status - 簽核狀態
 * @param {Number} key - 簽核關卡
 * @returns {Object} data - 三項 element
 */
export const checkStatus = function( status, key ) {
  let data;
  switch ( status ) {
    case 'pending':
      data = {
        actNumber: $( `<div class="act-number pending">${key}</div>` ),
        actBref: $( `<div class="act-bref pending"></div>` ),
        status: $( `<div class="status">處理中</div>` ),
      };
      break;
    case 'approved':
      data = {
        actNumber: $( `<div class="act-number approved">&#10003</div>` ),
        actBref: $( `<div class="act-bref approved"></div>` ),
        status: $( `<div class="status">審核通過</div>` ),
      };
      break;
    case 'rejected':
      data = {
        actNumber: $( `<div class="act-number rejected">X</div>` ),
        actBref: $( `<div class="act-bref rejected"></div>` ),
        status: $( `<div class="status">不通過</div>` ),
      };
      break;
    case 'queueing':
      data = {
        actNumber: $( `<div class="act-number queueing">${key}</div>` ),
        actBref: $( `<div class="act-bref queueing"></div>` ),
        status: $( `<div class="status">待處理</div>` ),
      };
      break;
    case 'start':
      data = {
        actNumber: $( `<div class="act-number start">${key}</div>` ),
        actBref: $( `<div class="act-bref start"></div>` ),
        status: $( `<div class="status">送出申請</div>` ),
      };
      break;
  }
  return data;
}

const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
});
// Kemudian kembalikan fungsi mapDBToModel dengan objek note baru yang nama propertinya sudah disesuaikan
module.exports = { mapDBToModel };